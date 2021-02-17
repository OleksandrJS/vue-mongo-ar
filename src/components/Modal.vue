<!-- @format -->

<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      class="modal fade"
      @click.self="closeModal"
      :class="[
        { 'show d-block': show },
        { 'd-none': !show },
        { 'modal-mini': type === 'mini' },
      ]"
      v-show="show"
      tabindex="-1"
      role="dialog"
      :aria-hidden="!show"
    >
      <div
        class="modal-dialog"
        :class="[{ 'modal-notice': type === 'notice' }, modalClasses]"
      >
        <div class="modal-content" style="mt-2">
          <slot name="base-content">
            <div class="modal-header" :class="headerClasses">
              <slot name="close-button">
                <!-- <button
                  type="button"
                  v-if="showClose"
                  @click="closeModal"
                  class="close"
                  data-dismiss="modal"
                  :aria-hidden="!show"
                  style="cursor: pointer"
                >
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </button> -->
              </slot>
              <div class="col text-center modal-title">
                Registration
              </div>
            </div>

            <div class="modal-body" :class="bodyClasses">
              <template>
                <fg-input
                  class="no-border"
                  placeholder="First Name..."
                  addon-left-icon="now-ui-icons users_circle-08"
                  v-model="first_name"
                >
                </fg-input>

                <fg-input
                  class="no-border"
                  placeholder="Last Name..."
                  addon-left-icon="now-ui-icons text_caps-small"
                  v-model="last_name"
                >
                </fg-input>

                <fg-input
                  class="no-border"
                  placeholder="Email"
                  addon-left-icon="now-ui-icons ui-1_email-85"
                  v-model="email"
                >
                </fg-input>
                <fg-input
                  class="no-border"
                  placeholder="Username"
                  addon-left-icon="now-ui-icons users_single-02"
                  v-model="username"
                >
                </fg-input>
                <fg-input
                  class="no-border"
                  placeholder="Phone"
                  addon-left-icon="now-ui-icons ui-1_email-85"
                  v-model="phone"
                >
                </fg-input>
                <fg-input
                  class="no-border"
                  placeholder="Password"
                  addon-left-icon="now-ui-icons business_bulb-63"
                  v-model="password"
                  type="password"
                >
                </fg-input>
                <fg-input
                  class="no-border"
                  placeholder="Confirm password"
                  addon-left-icon="now-ui-icons business_bulb-63"
                  v-model="confirm"
                  type="password"
                >
                </fg-input>
                <div
                  class="error"
                  v-if="confirm === password && confirm !== ''"
                >
                  {{ passMessage }}
                </div>
              </template>

              <n-button @click="registration" type="primary" round size="lg"
                >Register</n-button
              >
            </div>

            <div class="modal-footer" :class="footerClasses">
              <slot name="footer"></slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions';
import { FormGroupInput, Button } from '@/components';

export default {
  name: 'modal',
  components: {
    SlideYUpTransition,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        let acceptedValues = ['', 'notice', 'mini'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    modalClasses: [Object, String],
    headerClasses: [Object, String],
    bodyClasses: [Object, String],
    footerClasses: [Object, String],
    animationDuration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirm: '',
      passMessage: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false);
      this.$emit('close');
    },
    registration() {
      if (this.password !== this.confirm) {
        this.passMessage = '';
        this.$store.dispatch('register', {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          phone: this.phone,
          email: this.email,
          password: this.password,
        });
        this.closeModal();
      } else {
        this.passMessage = 'You entered different passwords';
      }
    },
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add('modal-open');
      } else {
        documentClasses.remove('modal-open');
      }
    },
  },
};
</script>
<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
.modal-title {
  color: #2c2c2c;
  font-size: 18px;
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
}
</style>
