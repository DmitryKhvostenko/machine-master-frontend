export interface IRepair {
	machineId: {
		_id: string
		country: string
		year: number
		brand: string
    repairCount: number
	}
	repairId: {
		name: string
		duration: number
		cost: number
		notes: string
	}
	startDate: Date
	notes: string
}
