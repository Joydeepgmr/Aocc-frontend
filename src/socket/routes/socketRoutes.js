export const dashboardSocket = {
    flightSchedule: {
        arrival: '',
        departure: ''
    },
    milestone: {
        arrival: '',
        departure: ''
    },
    telexMessage: {
        mvt: '',
        ldm: '',
        ptm: '',
    }
}

export const plansSocket = {
    seasonal: {
        arrival: '',
        departure: ''
    },
    dailySchedule: {
        flightSchedule: {
            arrival: '',
            departure: ''
        },
        resourceAllocation: {
            checkInCounter: '',
            gates: '',
            stands: '',
            belts: '',
            taxiways: '',
        }
    },
}