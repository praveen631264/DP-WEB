export interface Document {
  id: string;
  title: string;
  filename: string;
  content: string;
  category: string;
  lastModified: Date;
  metadata: {
    uploaded_at: string;
    processing_status: string;
    kvp?: { key: string; value: string }[];
  };
}
