import { USER_ROLES, User } from "../../src/models/User"

describe("testando a model user", () => {
    
    let user: User

    beforeEach(()=> {
        user = new User(
             "id-mock-user",
             "user",
             "user@email.com",
             "hash-mock-user", // senha = "user123"
             USER_ROLES.NORMAL,
             new Date().toISOString()
        )
    })
    
    test("deve instanciar corretamente", () => {
        expect(user).toBeInstanceOf(User)
    })

    test("deve encapsular id", () => {  
        user.setId("id-mock-user") 
        expect(user.getId()).toEqual("id-mock-user")
    })

    test("deve encapsular name", () => {
        user.setName("user")  
        expect(user.getName()).toEqual("user")
    })

    test("deve encapsular email", () => {
        user.setEmail("user@email.com")    
        expect(user.getEmail()).toEqual("user@email.com")
    })
    
    test("deve encapsular senha", () => {
        user.setPassword("hash-mock-user")    
        expect(user.getPassword()).toEqual("hash-mock-user")
    })

    test("deve encapsular role", () => {
        user.setRole(USER_ROLES.NORMAL)    
        expect(user.getRole()).toEqual(USER_ROLES.NORMAL)
    })

    test("deve encapsular data de criação", () => {
        user.setCreatedAt(new Date().toISOString())    
        expect(user.getCreatedAt()).toEqual(new Date().toISOString())
    })
})