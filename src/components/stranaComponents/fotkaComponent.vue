<template>
  <div class="fotka" @click="triggerFileInput">
    <img :src="imageSrc" alt="fotka" />
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" accept="image/*" />
    <button v-if="isImportedImage" class="reset-button" @click.stop="resetImage">X</button>
  </div>
</template>

<script>
export default {
  props: {
    uniqueKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      defaultImage: '/default.jpeg',
      imageSrc: localStorage.getItem(this.uniqueKey) || '/default.jpeg'
    };
  },
  computed: {
    isImportedImage() {
      return this.imageSrc !== this.defaultImage;
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
          localStorage.setItem(this.uniqueKey, e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        console.log('Please select an image file.');
      }
    },
    resetImage() {
      this.imageSrc = this.defaultImage;
      localStorage.removeItem(this.uniqueKey);
    }
  },
  created() {
    this.imageSrc = localStorage.getItem(this.uniqueKey) || this.defaultImage;
  }
}
</script>

<style>
.fotka {
  position: relative;
  display: inline-block;
}

.fotka img {
  aspect-ratio: 4/3;
  object-fit: cover;
  max-width: 13cm;
  width: 100%;
  border-radius: 1mm;
}

.reset-button {
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  background-color: rgba(221, 221, 221, 0.485);
  border: none;
  border-radius: 30%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.fotka:hover .reset-button {
  opacity: 1;
}
</style>