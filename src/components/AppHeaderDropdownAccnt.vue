<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem @click="logout">
        <!-- <CIcon icon="cil-lock-locked" /> -->
        <CIcon icon="cil-data-transfer-down" />
        Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser')

      return this.$router.push({ name: 'Pages' })
      // currentUserSubject.next(null)
    },
  },
}
</script>
