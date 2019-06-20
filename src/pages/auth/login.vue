<template>
  <q-page>
    <h4 class="text-center">Login Page</h4>
    <div class="flex flex-center q-pa-md">
      <q-form
        @submit="login"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          outlined
          v-model="user.email"
          type="email"
          label="Your email *"
          hint="Your email address"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Email field is required']"
        ></q-input>

        <q-input v-model="user.password"
                 outlined
                 label="Your Password *"
                 :type="user.isPwd ? 'password' : 'text'"
                 hint="Password with toggle"
                 lazy-rules
                 :rules="[ val => val && val.length > 0 || 'Password field is required']"
        >
          <template slot="append">
            <q-icon
              :name="user.isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="user.isPwd = !user.isPwd"
            ></q-icon>
          </template>
        </q-input>

        <q-toggle v-model="user.accept" label="I accept the license and terms"></q-toggle>

        <div>
          <q-btn label="Submit" type="submit" color="primary"></q-btn>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'login',
  layout: 'basic',
  data () {
    return {
      user: { isPwd: true }
    }
  },

  methods: {
    /**
       * Method can be used to login the user
       */

    login () {
      this.$store.dispatch('auth/login', this.user)
    },

    onReset () {
      this.user = {}
    },

    /**
       * Method used to get the user resetting password route.
       *
       * @returns {Object} The user route.
       */
    getSelfResetPasswordRoute () {
      this.$router.push({
        name: 'PasswordEmail'
      })
    }
  }
}
</script>
