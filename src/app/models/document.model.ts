import { KeyValuePair } from "../kvp.service";

export interface Document {
  id: string;
  title: string;
  filename: string;
  content: string;
  category: string;
  lastModified: Date;
  kvps: KeyValuePair[];
  metadata: {
    uploaded_at: string;
    processing_status: string;
  };
}
