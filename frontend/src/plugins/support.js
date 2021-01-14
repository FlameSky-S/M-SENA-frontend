import { MessageBox } from 'element-ui'

if (!!window.ActiveXObject || 'ActiveXObject' in window) {
  MessageBox({
    title: 'Note',
    message:
      'Microsoft has officially ended support for IE since the year 2015. Please <a target="_blank" style="color:blue" href="https://www.microsoft.com/zh-cn/edge/">Click Here</a> to download Edge from Microsoft.',
    type: 'warning',
    showClose: false,
    showConfirmButton: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    closeOnHashChange: false,
    dangerouslyUseHTMLString: true,
  })
}
