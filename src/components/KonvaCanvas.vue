<template>
  <div>
    <div id="konva-holder"></div>
    <div id="position-info">{{ positionInfo }}</div>
    <div id="form-data-container"></div>

  </div>
</template>

<script>
import Konva from 'konva';
import Swal from 'sweetalert2';


export default {     
  data() {
    return {
      stage: null,
      layer: null,
      rectangles: [],
      isNowDrawing: false,
      positionInfo: '',
    };
  },
  mounted() {
    this.stage = new Konva.Stage({
      height: window.innerHeight,
      width: window.innerWidth,
      container: 'konva-holder',
    });
    const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    try {
      const parsedFormData = JSON.parse(storedFormData);
      this.$store.commit('setFormData', parsedFormData);
    } catch (error) {
      console.error('Error parsing stored form data:', error);
    }
  }

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.loadRectanglesFromLocalStorage();
    this.drawStoredRectangles();

    this.stage.on('mousedown', this.mousedownHandler);
    this.stage.on('mousemove', this.mousemoveHandler);
    this.stage.on('mouseup', this.mouseupHandler);
  },
  beforeUnmount() {
  // Persist the form data to localStorage
  localStorage.setItem('formData', JSON.stringify(this.formData));
},
  methods: {
    // addFormData(formData) {
    //   this.$store.dispatch('appendFormData', formData);
    // },
    mousedownHandler() {
      this.isNowDrawing = true;
      const pointerPosition = this.stage.getPointerPosition();
      const newRect = new Konva.Rect({
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 0,
        height: 0,
        fill: 'transparent',
        stroke: 'blue',
      });
      this.layer.add(newRect);
      this.rectangles.push(newRect);
      this.layer.batchDraw();
    },
    mousemoveHandler() {
      if (!this.isNowDrawing) return false;
      const pointerPosition = this.stage.getPointerPosition();
      const currentRect = this.rectangles[this.rectangles.length - 1];
      const newWidth = pointerPosition.x - currentRect.x();
      const newHeight = pointerPosition.y - currentRect.y();
      currentRect.width(newWidth).height(newHeight);
      this.layer.batchDraw();

      const x = pointerPosition.x;
      const y = pointerPosition.y;
      this.positionInfo = `Mouse position: x = ${x}, y = ${y}`;
    },
    mouseupHandler() {
      this.isNowDrawing = false;
      this.showFormDialog();
    },
    loadRectanglesFromLocalStorage() {
      const storedRectangles = localStorage.getItem('rectangles');
      if (storedRectangles) {
        this.rectangles = JSON.parse(storedRectangles);
      }
    },
    drawStoredRectangles() {
      for (const rectData of this.rectangles) {
        const rect = new Konva.Rect(rectData);
        this.layer.add(rect);
      }
      this.layer.batchDraw();
    },
    saveRectanglesToLocalStorage() {
      localStorage.setItem('rectangles', JSON.stringify(this.rectangles));
    },
    showFormDialog() {
      const form = document.createElement('form');
      form.className = 'form';

      const createInputField = (label, type, name) => {
        const container = document.createElement('div');
        container.className = 'field-container';

        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = label;

        const fieldInput = document.createElement('input');
        fieldInput.type = type;
        fieldInput.name = name;

        container.appendChild(fieldLabel);
        container.appendChild(fieldInput);

        return container;
      };

      const usernameField = createInputField('Username:', 'text', 'username');
      const emailField = createInputField('Email:', 'email', 'email');
      const addressField = createInputField('Address:', 'text', 'address');
      const cityField = createInputField('City:', 'text', 'city');
      const nationalityField = createInputField('Nationality:', 'text', 'nationality');
      const ageField = createInputField('Age:', 'number', 'age');

      form.appendChild(usernameField);
      form.appendChild(emailField);
      form.appendChild(addressField);
      form.appendChild(cityField);
      form.appendChild(nationalityField);
      form.appendChild(ageField);

      Swal.fire({
  title: 'Mapping',
  html: form,
  showCancelButton: true,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
}).then((result) => {
  if (result.isConfirmed) {
    const formData = {
      username: form.username.value,
      email: form.email.value,
      address: form.address.value,
      city: form.city.value,
      nationality: form.nationality.value,
      age: form.age.value,
    };

    for (const [key, value] of Object.entries(formData)) {
      const container = document.createElement('div');
      container.textContent = `${key}: ${value}`;
      document.getElementById('form-data-container').appendChild(container);
    }
    this.$store.commit('setFormData', formData);
    
    // this.$store.dispatch('appendFormData', formData);
    // Save form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    this.$router.push('/about');
  } else {
    this.isNowDrawing = true; // Re-enable drawing
  }
});

}
  },
  beforeDestroy() {
    this.saveRectanglesToLocalStorage();
  },
};
</script>

<style>
#konva-holder {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.form {
  display: grid;
  gap: 1rem;
}

.field-container {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
