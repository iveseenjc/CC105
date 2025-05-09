let allTasks = [];
const API = "http://localhost:3000/api/tasks";

const sortStates = {
	due: true,
	priority: true,
	created: false,
	overdue: true
};

async function loadTasks() {
	const res = await fetch(API)
		.catch(
			err => {
				alert("Please run 'node server.js' in your terminal, then refresh the page.");
				throw err;
			}
		);
	allTasks = await res.json();
	renderTasks(allTasks);
}

function formatDueDate(date) {
	const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	const m = months[date.getMonth()];

	const d = String(date.getDate()).padStart(2, "0");
	const y = date.getFullYear();

	const t = date.toLocaleTimeString();
	return `${m}/${d}/${y}, ${t}`;
}
  

function renderTasks(tasks) {
	const taskList = document.getElementById("taskList");
	taskList.replaceChildren();

	if (tasks.length === 0) {
		const li = document.createElement("li");
		li.innerHTML = `<p><b>No tasks set</b></p>`;
		taskList.appendChild(li);
		return;
	}

	const now = new Date();
	tasks.forEach((task) => {
		const li = document.createElement("li");
		li.classList.add(task.task_priority.toLowerCase());


		const dueDate =
		task.task_due && !isNaN(new Date(task.task_due))
			? new Date(task.task_due)
			: null;


		const dueDisplay = dueDate
			? `<p>Due: ${formatDueDate(dueDate)}</p>`
			: `<p><em>No due date set</em></p>`;

		let overdueNotice = "<p></p>";
		if (dueDate && dueDate < now) {
			overdueNotice = `<p style="color:#ff4040;"><strong>Overdue!</strong></p>`;
			li.classList.add("overdue");
		}

		li.innerHTML = `
			<p><strong>${task.task_title}</strong></p>
			${dueDisplay}
			<p>Priority: ${task.task_priority}</p>
			${overdueNotice == "<p></p>"  ?
				`<button onclick="editTask(${task.id})">
					<i class="fa fa-pencil"></i>
				</button>` : ""
			}
			<button class="delete-button" onclick="deleteTask(${task.id})">
				<i class="fa fa-trash"></i>
			</button>
			${overdueNotice}
		`;

		taskList.appendChild(li);
	});
}

document.getElementById("taskForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	const title = document.getElementById("taskTitle").value;
	const dueRaw = document.getElementById("taskDue").value;
	const due = dueRaw || null;
	const priority = document.getElementById("taskPriority").value;

	await fetch(API, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
		task_title: title,
		task_due: due,
		task_priority: priority,
		}),
	});
	document.getElementById("taskForm").reset();
	loadTasks();
});

function updateTask(id, data) {
  	return fetch(`${API}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).then((r) => r.json());
}

function editTask(id) {
	const task = allTasks.find(t => t.id === id);
	if (!task) 
		return alert("Task not found");
	showEditModal(task);
}

function showEditModal(task) {
	document.getElementById('editTitle').value = task.task_title;
	document.getElementById('editDue').value = task.task_due || '';
	document.getElementById('editPriority').value = task.task_priority;
  
	const overlay = document.getElementById('editModal');
	overlay.style.display = 'flex';
  
	const form = document.getElementById('editForm');
	form.onsubmit = async e => {
		e.preventDefault();
		const updated = {
			task_title: document.getElementById('editTitle').value,
			task_due:   document.getElementById('editDue').value || null,
			task_priority: document.getElementById('editPriority').value,
			created_at: new Date().toISOString()
		};

		await updateTask(task.id, updated);
		closeEditModal();
		loadTasks();
	};

	document.getElementById('editCancel').onclick = () => {
	  	closeEditModal();
	};
}
  
function closeEditModal() {
	document.getElementById('editModal').style.display = 'none';
}

function deleteTask(id) {
	if (!confirm("Delete this task?")) 
		return;

	fetch(`${API}/${id}`, { method: "DELETE" }).then(() => loadTasks());
}

function deleteAllTasks() {
	if (!confirm("Delete ALL tasks?")) return;
	fetch(API, 
		{ method: "DELETE" }
	)
	.then((r) => {
		if (!r.ok) throw new Error(r.status);
			return r.json();
		})
	.then(() => loadTasks())
	.catch(() => alert("Failed to delete all tasks"));
}

function sortTasks(criteria) {
	let sorted = [...allTasks];
	const ascending = sortStates[criteria];
  
	if (criteria === "due") {
		const withDue = sorted.filter(t => t.task_due);
		const noDue  = sorted.filter(t => !t.task_due);
	
		if (!ascending) {
			noDue.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
			withDue.sort((a, b) => new Date(a.task_due)    - new Date(b.task_due));
			sorted = noDue.concat(withDue);
		} 
		else {

			withDue.sort((a, b) => new Date(b.task_due)    - new Date(a.task_due));
			noDue.sort((a, b)  => new Date(b.created_at)  - new Date(a.created_at));
			sorted = withDue.concat(noDue);
		}
	}
	else if (criteria === "priority") {
		const order = { High: 1, Medium: 2, Low: 3 };
		sorted.sort((a, b) =>
			(order[a.task_priority] || 4) - (order[b.task_priority] || 4)
		);

		if (!ascending) 
			sorted.reverse();
	}
	else if (criteria === "created") {
		sorted.sort((a, b) =>
			new Date(a.created_at) - new Date(b.created_at)
		);

		if (ascending) 
			sorted.reverse();
	}
	else if (criteria === "overdue") {
		const now = Date.now();
		const overdue = sorted.filter(t =>
			t.task_due && new Date(t.task_due).getTime() < now
		);

		const rest = sorted.filter(t =>
			!(t.task_due && new Date(t.task_due).getTime() < now)
		);
	
		if (ascending) {
			overdue.sort((a, b) => new Date(a.task_due)   - new Date(b.task_due));
			rest.sort((a, b)    => new Date(a.created_at) - new Date(b.created_at));
		} 
		else {
			overdue.sort((a, b) => new Date(b.task_due)   - new Date(a.task_due));
			rest.sort((a, b)    => new Date(b.created_at) - new Date(a.created_at));
		}
		sorted = overdue.concat(rest);
	}
  
	sortStates[criteria] = !ascending;
  
	const btn = document.getElementById({
		due:           'sortDueBtn',
		priority:      'sortPriorityBtn',
		created:       'sortCreatedBtn',
		overdue:  'sortOverdueBtn'
	}[criteria]);
	
	if (btn) {
		btn.textContent =
			`Sort by ${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`  +
			(sortStates[criteria] ? '↑' : '↓');
	}
  
	renderTasks(sorted);
} 

window.onload = () => {
  	loadTasks();
};
