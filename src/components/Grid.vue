<template>
  <div class="page">
    <div class="grid">
      <div v-for="row, i in puzzle.board" :key="i" class="row" 
        @click.right.prevent="clearSelected">
        <div v-for="cell, j in row" 
            :key="j" class="cell" 
            :class="[{ selected: cell.selected }, 'valuelen' + cell.value.length, { editable: cell.editable} ]"
            @click.prevent="select(cell)"
            @keydown.esc.exact="clearSelected"
            @keydown.exact="updateValue"
            @keydown.shift.exact="updatePencil"
            @keydown.delete.exact="clearValues"
            tabindex="0">
          {{ cell.value }}
          <div v-if="cell.pencil && !cell.value" class="pencil" v-html="cell.pencilAsBlock().join('\n')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: [ 'puzzle'],
  methods: {
    select(cell) {
      cell.selected = !cell.selected
    },
    clearSelected() {
      this.puzzle.clearSelected()
    },
    clearValues() {
        let cells = this.puzzle.getSelected()
        cells.forEach( c => {
          c.clearValue()
          c.clearPencil()
        })
    },
    updateValue(event) {
      // check if the code looks ok
      let match = event.code.match(/^Digit([1-9])$/)
      if(!match) return

      console.log('keydown ', match, event)
      let value = match[1]
      // get a list of selected cells
      let cells = this.puzzle.getSelected()
      cells.forEach( c => c.updateValue(value))

    },
    updatePencil(event) {
      // check if the code looks ok
      let match = event.code.match(/^Digit([1-9])$/)
      if(!match) return
      console.log('keydown ', match, event)
            let value = match[1]
      // get a list of selected cells
      let cells = this.puzzle.getSelected()
      cells.forEach( c => c.updatePencil(value))
    }
  }
}

</script>

<style scoped>

.pencil {
  font-size: 0.3em;
  height: 100%;
  width: 100%;
  position: relative;
  text-align: right;
  top: 0;
  left: 0;
  white-space: pre;
}

.cell {
  display: flex;
  width: 64px;
  height: 64px;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
  border-right: 1px solid darkgray;
  font-size: 4em;
  font-weight: bold;
}

.editable {
  font-weight: normal;
  color: black;
}

.selected {
  background: lightgray
}

.cell:nth-child(3n+3) {
  border-right: 2px solid black;
}

.cell:last-child {
  border-right: 0px
}

.row {
  display: flex;
  border-bottom: 1px solid darkgray;
}

.row:nth-child(3n+3) {
  border-bottom: 2px solid black;
}

.row:last-child {
  border-bottom: 0px;
}

.grid {
  display: block;
  border: 2px solid black;
  cursor: default;
}

.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 100%;
}

.valuelen2 {
  font-size: 3em;
  color: darkslategray;
}

.valuelen3 {
  font-size: 2.5em;
}

.valuelen4 {
  font-size: 1.9em;
}

.valuelen5 {
  font-size: 1.4em;
}

.valuelen6 {
  font-size: 1.2em;
}

.valuelen7 {
  font-size: 1em;
}

</style>
