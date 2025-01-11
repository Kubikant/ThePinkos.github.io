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
    },
    image: {
      type: String,
      default: '/default.jpeg'
    }
  },
  data() {
    return {
      defaultImage: '/default.jpeg',
      imageSrc: this.image
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
      if (this.isValidImageFile(file)) {
        this.readImageFile(file);
      } else {
        console.log('Please select an image file.');
      }
    },
    isValidImageFile(file) {
      return file && file.type.startsWith('image/');
    },
    readImageFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    updateImageSrc(src) {
      this.imageSrc = src;
    },
    resetImage() {
      this.imageSrc = this.defaultImage;
    }
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