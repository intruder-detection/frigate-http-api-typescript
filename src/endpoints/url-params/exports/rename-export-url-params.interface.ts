import { ExportIdUrlParams } from './export-id-url-params.interface';

export interface RenameExportUrlParams extends ExportIdUrlParams {
  export_name_new: string;
}
