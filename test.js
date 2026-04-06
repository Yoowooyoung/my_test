const posts = [
  { id: 1, title: "Vue 시작하기",   author: "홍길동", views: 10, done: false },
  { id: 2, title: "Spring 입문",    author: "김철수", views: 45, done: true  },
  { id: 3, title: "MySQL 기초",     author: "이영희", views: 30, done: false },
  { id: 4, title: "Git 브랜치 전략", author: "박해수", views: 22, done: true  }
];

const titles = posts.map(post => post.title);
console.log(titles);

const postsWithLabel = posts.map(post => ({
  ...post,
  label: post.views >= 30 ? "인기" : "일반"
}));

console.log(postsWithLabel[0].label);
console.log(postsWithLabel[1].label);

const popularPosts = posts.filter(post => post.views >= 30);
console.log(popularPosts.length);

const activePosts = posts.filter(post => !post.done);
console.log(activePosts.length);

const hongsPosts = posts.filter(post => post.author === "홍길동" || post.author === "김철수");
console.log(hongsPosts.length);

const filtered = posts.filter(post => post.id === 2);
console.log(filtered);
console.log(filtered[0]);

const found = posts.find(post => post.id === 2);
console.log(found);

posts.forEach(post => {
  console.log(`[${post.id}] ${post.title} - ${post.views}회`);
})


let todos = [
  { id: 1, text: "HTML 복습", done: false },
  { id: 2, text: "CSS 정리", done: false }
];

const afterAdd = [...todos, { id: 3, text: "JS 실습", done: false }];
const afterDelete = todos.filter(todo => todo.id !== 1);
const afterToggle = todos.map(todo => todo.id === 1 ? {...todo, done: !todo.done} : todo);

console.log(todos);
console.log(afterAdd);
console.log(afterDelete);
console.log(afterToggle);

let nextId = 1;

function addTodo(text) {
  if (!text.trim()) return;
  todos = [...todos, { id: nextId++, text, done: false }];
  render();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
}

function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo);
  render();
}

function render() {
  const list = document.querySelector('#todo-list');
  const count = document.querySelector('#todo-count');

  list.innerHTML = todos.map(todo => `
    <li style="text-decoration: ${todo.done ? 'line-through' : 'none'}">
      <input type="checkbox" ${todo.done ? 'checked' : ''}
             onchange="toggleTodo(${todo.id})">
      ${todo.text}
      <button onclick="deleteTodo(${todo.id})">삭제</button>
    </li>
  `).join('');

  // 남은 항목 수 표시
  const remaining = todos.filter(todo => !todo.done).length;
  count.innerText = `남은 항목: ${remaining}개`;
}

// 이벤트 연결
document.querySelector('#add-btn').addEventListener('click', () => {
  const input = document.querySelector('#todo-input');
  addTodo(input.value);
  input.value = '';
  input.focus();
});
