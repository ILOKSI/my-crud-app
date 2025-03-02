<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref,computed, reactive} from "vue";

const inputuser = ref(null);

let newUser = reactive({
        firstName:"",
        lastName:"",
        email:"",
        role:""
})

const editmode = ref(false);

const GET_USERS = gql`
    query GetUsers {
        getUsers {
        id
        firstName
        lastName
        email
        role
        }
    }
`;

const { result,loading, error } = useQuery(GET_USERS)

//массив с данными получаем с сервера  как результат выполнения запроса
const users = computed(() => result.value?.getUsers ?? [])

function addUser() {
//описываем на gql языке запрос на добавление
    const ADD_USER = gql`
        mutation AddUser($input: userInput!) {
            addUser(input: $input) {
                id
                firstName
                lastName
                email
                role
            }
        }`
    const { mutate:runAddUser,onDone } = useMutation(ADD_USER);

    runAddUser(
        {input:newUser},
        {refetchQueries:[{query: GET_USERS}]}
    )
    //Обрабатываем событие успешного действия
    onDone(() => {
      resetUser(); //очищаем все поля
    })
}

function deleteUser(item) {
//описываем на gql языке запрос на удаление
    const DELETE_USER = gql`
        mutation DeleteUser($id: ID!) {
            deleteUser(id: $id) {
                id
            }
        }`
//создаем мутацию и функцию для вызова 
    const { mutate:runDeleteUser } = useMutation(DELETE_USER);
//выполняем функцию мутацию
    runDeleteUser(
        {id: item.id,},
        {refetchQueries:[{query: GET_USERS}]}
    )
}

function saveUser() {
//описываем на gql языке запрос на обновление
    const UPDATE_USER = gql`
        mutation UpdateUser($input: userInput) {
            updateUser(input: $input) {
                id
                firstName
                lastName
                email
                role
            }
        }`
    const { mutate:runUpdateUser,onDone } = useMutation(UPDATE_USER);
    runUpdateUser(
        {   
            input: newUser
        },
        {refetchQueries:[{query: GET_USERS}]}
    )
//Обрабатываем событие успешного действия
    onDone(() => {
        resetUser(); //очищаем все поля
    }) 
}

function resetUser() {
  //тут обнуляем переменные и приводим все в исходное состояние
  for (let key in newUser) { // затираем переменную ввода , перебирая все элементы
    newUser[key]=""
    }
  inputuser.value.focus();
  editmode.value = false; //выключаем режим редактирования

}
function setUser(item) {
  // данная функция при режиме редактирования устанавливает в полях данные для редактирования
 
  //для вывода данных в полях, выводим их в связных переменных
  newUser = Object.assign({}, item);
  //удаляем системное поле
  delete  newUser.__typename
  //включаем режим редактирования, появляются кнопки
  editmode.value = true;
}

function setRole(role){
    newUser.role = role
}

</script>

<template>
    <div>
        <div>
            <input ref="inputuser" v-model="newUser.firstName"placeholder="Введите имя"/>
            <input v-model="newUser.lastName" placeholder="Введите фамилию"/>
            <input v-model="newUser.email" placeholder="Введите email"/>
            <button v-show="editmode" @click="saveUser">Сохранить</button>
            <button v-show="editmode" @click="resetUser">Отмена</button>
        </div>
        <div>
            <button @click="newUser.role = 'ADMIN' ">Админ</button>
            <button @click="newUser.role = 'MANAGER' ">Менеджер</button>
            <button @click="newUser.role = 'SALES' ">Продавец</button>
            <button @click="newUser.role = 'SUPPORT' ">Поддержка</button>
            <button @click="addUser">Добавить</button>
        </div>

        <!--вывод сообщения, если загрузка-->
        <div v-if="loading">Загрузка...</div>
        <!--Вывод сообщения, если ошибка-->
        <div v-else-if="error">Ошибка: {{ error.message }}</div>
        <table v-else-if="result && result.getUsers">
        <!-- Уже знакомый вывод списком-->
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td><button @click="deleteUser(user)">x</button></td>
                <td><button @click="setUser(user)">...</button></td>
            </tr>
        </table>
    </div>
</template>
