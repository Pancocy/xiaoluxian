import { toNumber } from '@vue/shared'
import { defineStore } from 'pinia'
export const useCartInfo = defineStore('cart', {
    state: () => {
        return {
            cartList: [], //存放数据
            selected: [], //存放选中的数据,一开始为空
            singles:[]
        }
    },
    getters: {
        //是否全选的一个标识
        isAllChecked() {
            return this.cartList.length == this.selected.length //返回值为false
        },
        //总价和数量的计算
        total(){
            let single={
                sum:0,
                number:0
            }
            this.singles=[]
            this.cartList.forEach(e=>{
                if(this.selected.indexOf(e.id) != -1){
                    single.number=this.selected.length;
                    single.sum += e.courseLevel*e.discountPrice
                    this.singles.push({
                        number:1,
                        id:e.courseId
                    })
                }
            })
            return{
                single
            }
        }
    },
    actions: {
        storeCart(list) {
            list.forEach(e => {
                e['check'] = true
                this.selected.push(e.id)
            });
            this.cartList = list
        },
        //全不选
        unAll() {
            this.cartList.forEach(v => {
                v['check'] = false;
            })
            this.selected = [];
        },
        //全选
        all() {
            this.selected = this.cartList.map(v => {
                v['check'] = true;
                return v.id;
            })
        },
        //单选
        itemChecked(index) {
            //当前点击的课程都id值
            let id = this.cartList[index].id;
            //去检查select中有没有
            let idx = this.selected.indexOf(id);

            if (idx > -1) {
                //有
                //把cartList里对应index的数据的check改为FALSE。使其选中状态改变
                this.cartList[index].check = false;
                //这时候全选的状态也要改变，从selected中删除对应的id，使两数据的长度不同
                this.selected.splice(idx, 1);
                console.log(this.selected);
            } else {
                //没有
                this.cartList[index].check = true;
                this.selected.push(id);
            }
        },

    },

})
