<?php

namespace DeepDiveAPI\resources;

use DeepDiveAPI\Resource;

class AuthorResource extends Resource {
    public function get() {
        return [
            'status' => 200,
            'data' => $this->getAuthors(),
        ];
    }

    public function post() {
        $data = $this->getJsonData();

        if (empty($data['name'])) {
            throw new \Exception("Name is required", 400);
        }

        $authorId = $this->insertAuthor($data);
        
        return [
            'status' => 201,
            'data' => $this->getAuthorById($authorId),
        ];
    }

    public function getById($id) {
        return [
            'status' => 200,
            'data' => $this->getAuthorById($id),
        ];
    }

    public function put($id) {
        $data = $this->getJsonData();

        if (empty($data['name'])) {
            throw new \Exception("Name is required", 400);
        }

        $this->updateAuthor($id, $data);
        
        return [
            'status' => 200,
            'data' => $this->getAuthorById($id),
        ];
    }

    public function delete($id) {
        $this->deleteAuthorById($id);

        return [
            'status' => 204,
            'data' => null,
        ];
    }

    // Private functions to handle database operations
    private function getAuthors() {
        $stmt = $this->pdo->prepare("SELECT * FROM author");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    private function getAuthorById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM author WHERE id = :id");
        $stmt->bindValue(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $author = $stmt->fetch();

        if (!$author) {
            throw new \Exception('Author not found', 404);
        }

        return $author;
    }

    private function insertAuthor($data) {
        $stmt = $this->pdo->prepare("INSERT INTO author (name) VALUES (:name)");
        $stmt->bindValue(':name', $data['name']);
        $stmt->execute();
        return $this->pdo->lastInsertId();
    }

    private function updateAuthor($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE author SET name = :name WHERE id = :id");
        $stmt->bindValue(':id', $id, \PDO::PARAM_INT);
        $stmt->bindValue(':name', $data['name']);
        $stmt->execute();
    }

    private function deleteAuthorById($id) {
        $stmt = $this->pdo->prepare("DELETE FROM author WHERE id = :id");
        $stmt->bindValue(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            throw new \Exception('Author not found', 404);
        }
    }
}
