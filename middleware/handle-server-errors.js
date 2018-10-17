export default function(nuxtContext) {
  const { req, error } = nuxtContext
  if (process.client) return
  if (!req.error) return
  console.log(`handle-server-error`)
  error({
    statusCode: req.error.statusCode || 500,
    message: req.error.message || `an fatal error as occurred`,
  })
}
