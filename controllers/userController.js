exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not available',
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  res.status(500).json({
    status: 'error',
    message: 'route not available',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not available',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not available',
  });
};
