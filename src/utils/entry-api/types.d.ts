export interface SuccessEntryRes<T> {
	success: true;
	data?: T;
}

export interface ErrorEntryRes {
	success: false;
	message: string;
}

export type EntryRes<T> = SuccessEntryRes<T> | ErrorEntryRes;
