export default function({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: process.env.API_URL,
    headers: {
      common: {
        'X-API-KEY': process.env.API_KEY
      }
    }
  })

  // Inject to context as $api
  inject('api', api)
}
