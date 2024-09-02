import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUser, getUsersDetail, updateUser } from 'services/PeopleService';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function User(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.detailUser) {
    try {
      const data = await getUsersDetail(
        typeof req.query.username === 'string'
          ? [req.query.username]
          : req.query?.username,
        typeof req.query.usersFields === 'string'
          ? req.query.usersFields.split(',')
          : req.query?.usersFields,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await getUser(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await createUser(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = await updateUser(req.body.data);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default User;
