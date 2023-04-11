<template>
  <HeaderComponent title="Profile">
    <section>
      <h3 class="mb-4 pt-2">Welcome damfat94@gmail.com</h3>
      <!-- <section class="d-flex justify-center align-center"> -->
      <section class="">
        <main class="bg-green py-5 px-7">
          <img
            alt="Avatar"
            class="rounded-circle"
            src="https://firebasestorage.googleapis.com/v0/b/media-tracker-f3101.appspot.com/o/A43pMBPrXiYLnMdsSu8GLclowvl2.png?alt=media&token=799f8a41-978e-4ef9-b8c9-b8c7480f8e8c"
            style="width: 80px"
          />
          <div>
            <h3>Roland</h3>
            <p class="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              dolores praesentium minus et fugit harum adipisci non a culpa.
              Repellat natus iste omnis eaque cumque? In nihil magni culpa odio
              neque assumenda libero officiis, modi autem? Nisi eligendi dolores
              aliquam reprehenderit, doloremque saepe, quo recusandae rem itaque
              sunt inventore iusto.
            </p>
          </div>
        </main>
        <aside class="bg-grey px-5 pt-2 pb-5">
          <section>
            <h3>Information</h3>
            <hr />
            <div class="pa-3">
              <h4>Email</h4>
              <p>damfat94@gmail.com</p>
            </div>
          </section>
          <section>
            <h3>Database</h3>
            <hr />
            <section
              class="d-flex align-center justify-space-evenly pa-3 text-no-wrap"
            >
              <section>
                <div class="pa-1">
                  <b class="text-decoration-underline">Anime</b>
                  <div>614 Anime</div>
                </div>
                <div class="pa-1">
                  <b class="text-decoration-underline">Manga</b>
                  <div>202 Manga</div>
                </div>
                <div class="pa-1">
                  <b class="text-decoration-underline">Games</b>
                  <div>398 Games</div>
                </div>
              </section>
              <section>
                <div class="pa-1">
                  <b class="text-decoration-underline">Characters</b>
                  <div>476 Characters</div>
                </div>
                <div class="pa-1">
                  <b class="text-decoration-underline">Emotes</b>
                  <div>383 Emotes</div>
                </div>
                <div class="pa-1">
                  <b class="text-decoration-underline">Notes</b>
                  <div>11 Notes</div>
                </div>
              </section>
            </section>
          </section>
          <section>
            <h3>Color Themes</h3>
            <hr />
            <div class="d-flex align-center justify-start flex-wrap py-3">
              <ButtonText
                class="me-2 mt-2"
                color="blue"
                size="small"
                text="blue"
              />
              <ButtonText
                class="me-2 mt-2"
                color="grey"
                size="small"
                text="gray"
              />
              <ButtonText
                class="me-2 mt-2"
                color="yellow"
                size="small"
                text="beige"
              />
              <ButtonText
                class="mt-2"
                color="pink"
                size="small"
                text="random"
              />
            </div>
          </section>
          <section>
            <h3>Backup</h3>
            <hr />
            <div class="d-flex align-center justify-start flex-wrap py-3">
              <ButtonText
                class="me-2 mt-2"
                color="blue"
                size="small"
                text="anime"
              />
              <ButtonText
                class="me-2 mt-2"
                color="grey"
                size="small"
                text="manga"
              />
              <ButtonText
                class="me-2 mt-2"
                color="yellow"
                size="small"
                text="games"
              />
              <ButtonText
                class="me-2 mt-2"
                color="pink"
                size="small"
                text="characters"
              />
              <ButtonText
                class="me-2 mt-2"
                color="orange"
                size="small"
                text="emotes"
              />
              <ButtonText
                class="mt-2"
                color="green"
                size="small"
                text="notes"
              />
            </div>
          </section>
          <section>
            <h3>Settings</h3>
            <hr />
            <div
              class="d-flex align-center justify-space-evenly flex-wrap py-3"
            >
              <ButtonText
                class="me-2 mt-2"
                color="yellow"
                size="small"
                text="edit profile"
              />
              <ButtonText
                class="me-2 mt-2"
                color="blue"
                size="small"
                text="log out"
              />
            </div>
          </section>
        </aside>
      </section>
    </section>
  </HeaderComponent>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
</script>
