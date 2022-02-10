const filters = {
  friendlyDate(dateStr) {
    const dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
    const time = dateObj.getTime()
    const now = Date.now()
    const span = now - time

    let str = ''

    switch (true) {
      case span < 60000:
        str = '刚刚'
        break
      case span < 1000 * 3600:
        str = Math.floor(span / 60000) + '分钟前'
        break
      case span < 1000 * 3600 * 24:
        str = Math.floor(span / (1000 * 3600)) + '小时前'
        break
      default:
        str = Math.floor(span / (1000 * 3600 * 24)) + '天前'
        break
    }
    return str
  }
}

export default filters
