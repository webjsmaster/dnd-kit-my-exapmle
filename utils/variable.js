let foldersIdCounter = 1
let camerasIdCounter = 1
let eventsIdCounter = 1


export const data = `[
    {
      "type": "folder",
      "id": ${foldersIdCounter++},
      "name": "Домик для гостей",
      "contains": [
        {
          "type": "folder",
          "id": ${foldersIdCounter++},
          "name": "Cпальня",
          "contains": [
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера в углу",
              "realtime": true,
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            },
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера фронтовая",
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            }
          ]
        },
        {
          "type": "folder",
          "id": ${foldersIdCounter++},
          "name": "Холл",
          "contains": [
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера ночного видения",
              "realtime": true,
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            },
            {
              "type": "camera",
              "id": ${camerasIdCounter++},
              "name": "Камера-тепловизор",
              "contains": [
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Гос.номера"
                },
                {
                  "type": "events_group",
                  "id": ${eventsIdCounter++},
                  "name": "Лица"
                }
              ]
            }
          ]
        },
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Камера широкоугольная",
          "realtime": true,
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        },
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Камера под плинтусом",
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        }
      ]
    },
    {
      "type": "folder",
      "id": ${foldersIdCounter++},
      "name": "Гостиная",
      "contains": [
        {
          "type": "camera",
          "id": ${camerasIdCounter++},
          "name": "Скрытая камера",
          "contains": [
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Гос.номера"
            },
            {
              "type": "events_group",
              "id": ${eventsIdCounter++},
              "name": "Лица"
            }
          ]
        }
      ]
    },
    {
      "type": "folder",
      "id": ${foldersIdCounter},
      "name": "Гараж",
      "contains": []
    }
  ]`;
