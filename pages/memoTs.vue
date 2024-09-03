<template>
  <div>
    <h1>Typescript tuto</h1>
    <div>
      <h2>Controle un input en utilisant namespace</h2>
      <form action="get" @submit="checkForm">
        <input v-model="postCode" type="text" name="postCode" />
      </form>
    </div>
    <TShelper />
  </div>
</template>

<script setup lang="ts">
import { Validation } from '../composables/ts_tuto/validation/namespace'
import { ValidationModule } from '../composables/ts_tuto/validation/LettersOnlyValidator'
import {
  interfaceMethod,
  interfaceMerge,
  interfaceDynamic,
} from '@/composables/ts_tuto/interface'

const postCode: Ref<string> = ref('')

interface User {
  firstName: string
  lastName?: string
}

const use = reactive({
  firstName: 'Ghislain',
}) satisfies User

const test = 'null'

function checkForm(event: Event) {
  event.preventDefault()
  const validators: { [s: string]: Validation.StringValidator } = {}
  validators['ZIP code'] = new Validation.ZipCodeValidator()
  if (validators['ZIP code'].isAcceptable(postCode.value)) {
    console.log('Match')
  } else {
    console.log('does not match')
  }
  //* EN MODULE AVEC NAMESPACE
  // @ts-expect-error: Unreachable code error
  const validatorsString: { [s: string]: ValidationModule.StringValidator } = {}
  validatorsString['letter'] = new ValidationModule.LettersOnlyValidator()
  if (validatorsString['letter'].isAcceptable(postCode.value)) {
    console.log('Match')
  } else {
    console.log('does not match')
  }
}

onMounted(() => {
  //   interfaceMethod();
  //   interfaceMerge();
  interfaceDynamic()
})
</script>

<style lang="scss" scoped></style>
