const fastify = require('fastify')({
    logger: true
  })

  fastify.get('/', function (request, reply) {
    reply.send("This server is running with Fastify!")
  })

  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
