
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Health check
server.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Dashboard stats
server.get('/api/v1/dashboard/stats', (req, res) => {
  const db = router.db.getState();
  const total_documents = db.documents.length;
  const documents_in_trash = db.documents.filter(doc => doc.deleted).length;
  const categories_count = db.categories.length;
  res.status(200).json({
    total_documents,
    documents_in_trash,
    categories_count,
    average_processing_time_seconds: 45.6,
  });
});

// Document Management
server.post('/api/v1/documents', (req, res) => {
    res.status(202).json(req.body);
});

server.get('/api/v1/documents', (req, res) => {
    const { category, include_deleted, page = 1, per_page = 10 } = req.query;
    let documents = router.db.get('documents');

    if (category) {
        documents = documents.filter({ category });
    }

    if (include_deleted) {
        documents = documents.filter({ deleted: include_deleted === 'true' });
    }

    const start = (page - 1) * per_page;
    const end = page * per_page;
    const paginatedDocs = documents.slice(start, end).value();

    res.status(200).json({
        page: Number(page),
        per_page: Number(per_page),
        total: documents.value().length,
        total_pages: Math.ceil(documents.value().length / per_page),
        data: paginatedDocs,
    });
});

server.get('/api/v1/documents/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Missing search query' });
    }
    const documents = router.db.get('documents').filter(doc => doc.filename.includes(q)).value();
    res.status(200).json(documents);
});

server.get('/api/v1/documents/:doc_id', (req, res) => {
    const doc_id = parseInt(req.params.doc_id, 10);
    const document = router.db.get('documents').find({ id: doc_id }).value();
    if (document) {
        res.status(200).json(document);
    } else {
        res.status(404).json({ message: 'Document not found' });
    }
});

server.delete('/api/v1/documents/:doc_id', (req, res) => {
    const doc_id = parseInt(req.params.doc_id, 10);
    const document = router.db.get('documents').find({ id: doc_id });
    if (document.value()) {
        document.assign({ deleted: true }).write();
        res.status(200).json({ message: 'Document moved to trash' });
    } else {
        res.status(404).json({ message: 'Document not found' });
    }
});

server.post('/api/v1/documents/:doc_id/restore', (req, res) => {
    const doc_id = parseInt(req.params.doc_id, 10);
    const document = router.db.get('documents').find({ id: doc_id });
    if (document.value() && document.value().deleted) {
        document.assign({ deleted: false }).write();
        res.status(200).json({ message: 'Document restored successfully' });
    } else {
        res.status(404).json({ message: 'Document not in trash' });
    }
});

server.get('/api/v1/documents/:doc_id/download', (req, res) => {
  res.status(200).send('File content');
});

// AI & Data Interaction
server.post('/api/v1/documents/:doc_id/reprocess', (req, res) => {
  res.status(202).json({ message: 'Document has been re-queued for processing.' });
});

server.put('/api/v1/documents/:doc_id/kvp', (req, res) => {
    const doc_id = parseInt(req.params.doc_id, 10);
    const document = router.db.get('documents').find({ id: doc_id });
    if (document.value()) {
        document.value().metadata.kvp = req.body;
        router.db.write();
        res.status(200).json(document.value());
    } else {
        res.status(404).json({ message: 'Document not found' });
    }
});

server.put('/api/v1/documents/:doc_id/recategorize', (req, res) => {
    const doc_id = parseInt(req.params.doc_id, 10);
    const { new_category } = req.body;

    if (!new_category) {
        return res.status(400).json({ message: 'new_category is missing' });
    }

    const document = router.db.get('documents').find({ id: doc_id });

    if (document.value()) {
        document.assign({ category: new_category }).write();
        res.status(200).json(document.value());
    } else {
        res.status(404).json({ message: 'Document not found' });
    }
});

server.post('/api/v1/chat', (req, res) => {
    const { query } = req.body;
    res.status(200).json({
        answer: `The answer to "${query}" is...`,
        source_documents: [],
    });
});

// Category Management
server.get('/api/v1/categories', (req, res) => {
  const categories = router.db.get('categories').map('name').value();
  res.status(200).json({ categories });
});

server.post('/api/v1/categories', (req, res) => {
    const { name } = req.body;
    const existingCategory = router.db.get('categories').find({ name }).value();
    if (existingCategory) {
        return res.status(409).json({ message: 'Category already exists' });
    }
    const newCategory = { id: Date.now(), name };
    router.db.get('categories').push(newCategory).write();
    res.status(201).json(newCategory);
});

server.delete('/api/v1/categories/:category_name', (req, res) => {
    const { category_name } = req.params;
    const docsWithCategory = router.db.get('documents').filter({ category: category_name }).value();

    if (docsWithCategory.length > 0) {
        return res.status(409).json({ message: 'Category is still in use' });
    }

    const category = router.db.get('categories').find({ name: category_name }).value();
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    router.db.get('categories').remove({ name: category_name }).write();
    res.status(200).json({ message: 'Category deleted successfully' });
});


server.use('/api/v1', router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
