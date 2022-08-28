module.exports = router => {
  router.get('/login', (req, res) => res.send('dynamic file require ok'))
}
