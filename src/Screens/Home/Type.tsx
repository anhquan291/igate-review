export interface FileFields {
  id: string;
  code: string;
  dossierStatus: {
    id: number;
    name: string;
    comment: string;
  };
}
