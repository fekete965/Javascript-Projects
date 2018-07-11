const testIncomingData = (value, title) => {
    const pattern = /^[-+]?[0-9]*\.?[0-9]+$/;
    if (pattern.test(value) && title.length > 0) {
        return true
    }

    return false
}

const transformValue = (value) => parseFloat(value.replace(/^[-+]/g, ''))

export { testIncomingData, transformValue }