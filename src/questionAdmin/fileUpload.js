import axios from 'axios'
import { getBaseServerURL } from '../util/urlHelper'


document.querySelector('#fileUpload').addEventListener('change', async (event) => {
  try {
    await handleCSVUpload(event)
    // eslint-disable-next-line no-alert
    alert('successfully uploaded')
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert('err: ', e)
  }
})

document.querySelector('#fileUpload').addEventListener('click', () => {
  document.querySelector('#fileUpload').value = ''
})


async function handleCSVUpload(event) {
  const { files } = event.target
  const formData = new FormData()
  formData.append('myFile', files[0])
  await axios.post(`${getBaseServerURL()}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
