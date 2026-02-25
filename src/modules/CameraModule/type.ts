import { WrappedResponse } from '../../core/types';

export type ScanQRCodeResult = {
  qrCode: string;
};

export type ScanQRCodeResponse = WrappedResponse<ScanQRCodeResult>;

export type ScanQRCodeRequest = {
  title?: string;
};
