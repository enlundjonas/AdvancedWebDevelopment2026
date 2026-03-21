<h1>CREATE</h1>

    ```mermaid
    sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Submit form
    F->>F: Client-side validation
    F->>B: POST /api/resources (JSON)

    B->>V: Validate request
    V-->>B: Validation result

    alt Validation fails
        B-->>F: 400 Bad Request + errors[]
        F-->>U: Show validation message
    else Validation OK
        B->>S: create Resource(data)
        S->>DB: INSERT INTO resources
        DB-->>S: Result / Duplicate error

        alt Duplicate
            S-->>B: Duplicate detected
            B-->>F: 409 Conflict
            F-->>U: Show duplicate message
        else Success
            S-->>B: Created resource
            B-->>F: 201 Created
            F-->>U: Show success message
        end
    end

<h1>READ</h1>


    ```mermaid
    sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js and resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant S as Resource Service
    participant DB as PostgreSQL

    U->>F: Select / view resource
    F->>B: GET /api/resources/:id

    B->>S: getResource(id)
    S->>DB: SELECT * FROM resources WHERE id

    alt Resource not found
        DB-->>S: No result
        S-->>B: Not found
        B-->>F: 404 Not Found
        F-->>U: Show error message
    else Success
        DB-->>S: Resource data
        S-->>B: Resource
        B-->>F: 200 OK + JSON
        F-->>U: Display resource
    end
