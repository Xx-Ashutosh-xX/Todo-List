package com.example.todo.demo;

import com.example.todo.demo.model.Task;
import com.example.todo.demo.repository.TaskRepository;
import com.example.todo.demo.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceTest {

	@InjectMocks
	private TaskService taskService;

	@Mock
	private TaskRepository taskRepository;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testCreateTask() {
		Task task = new Task("Test Task", "This is a test task.");
		when(taskRepository.save(task)).thenReturn(task);

		Task createdTask = taskService.createTask(task);

		assertNotNull(createdTask);
		assertEquals("Test Task", createdTask.getName());
		assertEquals("This is a test task.", createdTask.getDescription());
		verify(taskRepository, times(1)).save(task);
	}

	@Test
	public void testGetTaskById() {
		Task task = new Task("Test Task", "This is a test task.");
		when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

		Optional<Task> foundTask = taskService.getTaskById(1L);

		assertTrue(foundTask.isPresent());
		assertEquals("Test Task", foundTask.get().getName());
		verify(taskRepository, times(1)).findById(1L);
	}

	@Test
	public void testGetAllTasks() {
		Task task1 = new Task("Test Task 1", "Description 1");
		Task task2 = new Task("Test Task 2", "Description 2");
		when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));

		List<Task> tasks = taskService.getAllTasks();

		assertEquals(2, tasks.size());
		verify(taskRepository, times(1)).findAll();
	}

	@Test
	public void testUpdateTask() {
		Task existingTask = new Task("Old Task", "Old description");
		Task updatedTask = new Task("Updated Task", "Updated description");
		when(taskRepository.findById(1L)).thenReturn(Optional.of(existingTask));
		when(taskRepository.save(existingTask)).thenReturn(existingTask);

		Task result = taskService.updateTask(1L, updatedTask);

		assertEquals("Updated Task", result.getName());
		assertEquals("Updated description", result.getDescription());
		verify(taskRepository, times(1)).findById(1L);
		verify(taskRepository, times(1)).save(existingTask);
	}

	@Test
	public void testDeleteTask() {
		doNothing().when(taskRepository).deleteById(1L);

		assertDoesNotThrow(() -> taskService.deleteTask(1L));
		verify(taskRepository, times(1)).deleteById(1L);
	}
}
