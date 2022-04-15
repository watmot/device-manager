import express from 'express';

export default function (database) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const devices = await database.getDevices();

    if (!devices.length) {
      return res
        .status(404)
        .send({ error: 'No devices exist in the database.' });
    }

    return res.status(200).send(devices);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await database.getDevice(id);

    if (!user) {
      return res
        .status(404)
        .send({ error: `Device with ID ${id} could not be found.` });
    }

    return res.status(200).send(user);
  });

  return router;
}

// router.get('/', (req, res) => {
//   if (devices.length) {
//     res.status(200).send(devices);
//   }
//   res.status(404).send({ error: 'No devices exist in the database.' });
// });

// router.post('/', (req, res) => {
//   const body = req.body;

//   // If any required keys are missing from the request body
//   // Concatenate names and include in error response
//   const missingKeys = [];
//   if (body.name === undefined) missingKeys.push('name');
//   if (body.platform === undefined) missingKeys.push('platform');
//   if (body.firmware === undefined) missingKeys.push('firmware');

//   if (missingKeys.length) {
//     res.status(400).send({
//       error: `${missingKeys.join(', ')} is missing from the request body.`,
//     });
//   }

//   // Convert all numbers to a string
//   // Improves UX as most firmwares can be depicted as numbers
//   // e.g. 15, 13.4
//   for (const [key, value] of Object.entries(body)) {
//     const valueType = typeof value;
//     if (key === 'firmware') {
//       if (valueType === 'number') {
//         body[key] = value.toString();
//       } else {
//         if (valueType !== 'string') {
//           res.status(400).send({
//             error: `firmware must be a string or number.`,
//           });
//         }
//       }
//     } else {
//       if (valueType !== 'string') {
//         res.status(400).send({
//           error: `${key} must be a string.`,
//         });
//       }
//     }
//   }

//   const newDevice = {
//     ...body,
//     id: uuid(),
//     available: false,
//     currentOwner: null,
//     projects: [],
//   };

//   devices.push(newDevice);
//   res.status(201).send(newDevice);
// });

// router.use('/:id', (req, res, next) => {
//   const { id } = req.params;
//   const index = devices.findIndex((elem) => elem.id === id);

//   if (index !== -1) {
//     req.params = { ...req.params, index };
//     next();
//   }

//   res.status(404).send({ error: 'Device not found.' });
// });

// router.get('/:id', (req, res) => {
//   const { index } = req.params;
//   const device = devices[index];

//   res.status(200).send(device);
// });

// router.delete('/:id', (req, res) => {
//   const { index } = req.params;
//   devices.splice(index, 1);

//   res.status(204).send();
// });
