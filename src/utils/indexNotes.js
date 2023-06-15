// eslint-disable-next-line camelcase
const mapDBToModel = ({ id, title, body, tags, created_at }) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
});

module.exports = { mapDBToModel };
