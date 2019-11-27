export default {
    data() {
        return {
            name: '洋仔',
            age: 24,
        }
    },
    created() {
        console.log(this)
    },
    methods: {
        getAge() {
           console.log(`${this.name}的年龄是: ${this.age}`); 
        }
    }
    
}