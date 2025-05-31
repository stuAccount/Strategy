package com.stuAccount.Strategy;

import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"}) // adjust the port if needed
@RestController
@RequestMapping("/api/todos")
public class ToDoController {
    private List<ToDo> toDos = new ArrayList<>();
    private AtomicLong idCounter = new AtomicLong();

    @GetMapping
    public List<ToDo> getAll() {
        return toDos;
    }

    @PostMapping
    public ToDo addToDo(@RequestBody ToDo toDo) {
        toDo.setId(idCounter.incrementAndGet());
        toDos.add(toDo);
        return toDo;
    }

    @PutMapping("/{id}")
    public ToDo updateToDo(@PathVariable Long id, @RequestBody ToDo updatedToDo) {
        for (ToDo toDo : toDos) {
            if (toDo.getId().equals(id)) {
                toDo.setTitle(updatedToDo.getTitle());
                toDo.setCompleted(updatedToDo.isCompleted());
                return toDo;
            }
        }
        return null; // Or throw an exception if not found
    }

    @DeleteMapping("/{id}")
    public ToDo deleteToDo(@PathVariable Long id) {
        for (ToDo toDo: toDos) {
            if (toDo.getId().equals(id)) {
                toDos.remove(toDo);
                return toDo;
            }
        }
        return null;
    }
}