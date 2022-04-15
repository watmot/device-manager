## /devices

---

### `GET`

<br>

#### **Request**

##### _Query Parameters_

| Name      | Type    | Description                                |
| --------- | ------- | ------------------------------------------ |
| platform  | String  | Platform version (e.g. ios)                |
| available | Boolean | Only show available or unavailable devices |

<br>

#### **Response**

##### _Body_

```
[
  {
    id: Integer,
    name: String,
    platform: String,
    firmware: String,
    available: Boolean,
  },
  ...
]
```

<br>

##### _Response Codes_

| Code | Description |
| ---- | ----------- |
| 200  | Success     |

---

### `POST`

<br>

#### **Request**

##### _Body_

```
{
  name: String,
  platform: String,
  firmware: String,
}
```

<br>

#### **Response**

##### _Body_

```
{
  id: Integer,
  name: String,
  platform: String,
  firmware: String,
  available: Boolean,
  currentOwner: String || null,
  projects: [
    id: Integer
  ]
}
```

<br>

##### _Response Codes_

| Code | Description          |
| ---- | -------------------- |
| 201  | Created              |
| 400  | Invalid request body |

<br>

---

## /devices/:id

##### _Path Parameters_

| Name | Type    | Description          |
| ---- | ------- | -------------------- |
| id   | Integer | The ID of the device |

---

### `GET`

<br>

#### **Response**

##### _Body_

```
{
  id: Integer,
  name: String,
  platform: String,
  firmware: String,
  available: Boolean,
  currentOwner: String || null,
  projects: [
    id: Integer
  ]
}
```

<br>

##### _Response Codes_

| Code | Description                                  |
| ---- | -------------------------------------------- |
| 200  | Success                                      |
| 404  | The device ID does not exist in the database |

---

### `PUT`

<br>

#### **Request**

##### _Body_

```
{
  name: String,
  platform: String,
  firmware: String,
}
```

<br>

#### **Response**

##### _Body_

```
{
  id: Integer,
  name: String,
  platform: String,
  firmware: String,
  available: Boolean,
  currentOwner: String || null,
  projects: [
    id: Integer
  ]
}
```

<br>

##### _Response Codes_

| Code | Description                  |
| ---- | ---------------------------- |
| 201  | Created                      |
| 400  | Invalid request body         |
| 404  | The device ID does not exist |

---

### `DELETE`

<br>

#### **Response**

##### _Response Codes_

| Code | Description                  |
| ---- | ---------------------------- |
| 204  | No Content                   |
| 404  | The device ID does not exist |
