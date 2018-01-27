export default {
   getTime(time) {
    let timec = new Date(Number(time))
    const year = timec.getFullYear()
    const month = timec.getMonth() + 1
    const day = timec.getDate()
    const hours = timec.getHours()
    const minutes = timec.getMinutes()
    const seconds = timec.getSeconds()
    let timer = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    return timer
  }
}