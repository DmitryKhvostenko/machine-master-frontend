export interface INewRepair {
	country: string
	brand: string
	notes: string
	repairTypeId: string
	startDate: string
	year: number
}

export interface IResponseRepair {
	brand: string
	repairName: string
	repairId: string
}