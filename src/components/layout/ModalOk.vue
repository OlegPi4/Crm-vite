<script lang="ts" setup>

const emit = defineEmits(['closeM'])

function closeMod() {
   emit('closeM')
}

</script>

<template>
    <section name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
               <div class="modal-body">
                  <slot />
               </div>
               <div class="modal-footer">
                  <div class="modal-footer-btn">
                     <button class="modal-default-button" @click.stop="closeMod">
                        OK
                     </button>
                  </div>               
               </div>
            </div>
          </div>
        </div>
      </section>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 500;

}

.modal-footer-btn {
   display: flex;
   justify-content: center; 
}
.modal-default-button {
  color: #555;
  border: solid 1.5px #555; 
  padding: 5px 12px;
  border-radius: 6px;
}
.modal-default-button:hover {
   color: #1faa6b;
   background-color: #d7f3e8;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>