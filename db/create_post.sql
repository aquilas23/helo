INSERT INTO posts(title,imgUrl,content)
    VALUES ($1,$2,$3)
    RETURNING *;