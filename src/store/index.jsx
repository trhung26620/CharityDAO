import { createGlobalState } from "react-hooks-global-state"
import moment from "moment"

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    createModal: 'scale-0',
    connectedAccount: '',
    contract: null,
    proposals: [],
    isStackholder: false,
    balance: 0,
    mybalance: 0
})

const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
        var start = text.substring(0, startChars)
        var end = text.substring(text.length - endChars, text.length)
        while (start.length + end.length < maxLength) {
            start = start + '.'
        }
        return start + end
    }
    return text
}

const daysRemaining = (days) => {
    const todaysdate = moment()
    days = Number((days + '000'))
    days = moment(days).format('YYYY-MM-DD')
    days = moment(days)
    days = days.diff(todaysdate, 'days')
    return days == 0 || days == 1 ? days + ' day' : days + ' days'
}

export { setGlobalState, useGlobalState, getGlobalState, truncate, daysRemaining }