module.exports =  (res, status, content=undefined) => {
  res.type("application/json");
  res.status(status);
  switch (status) {
    case 200:
      res.send(content);
      break;
    case 500:
      res.send({
          error: "server error"
      });
      break;
    default:
      res.send({
        error: content
      });
  }

};