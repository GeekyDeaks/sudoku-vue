<template>
  <div class="home">
    <h1>sudoku vue</h1>
    <h2>{{ puzzles }} puzzles</h2>
    <hr/>
    <div class="puzzles">
      <div v-for="row, i in list" :key="i" class="row">
        <div v-for="col, j in row" :key="j" class="col" :class="{ blank: !col}" @click="loadPuzzle(col)">
          {{ col }}
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import puzzles from '@/puzzles'
import _ from 'lodash'

// make the puzzles into a small grid
let list = _.chunk(puzzles.map( ( _ , i) => i + 1), 10)
// pad the last one
list[list.length - 1].push(...Array(10 - list[list.length - 1].length).fill(''))

export default {
  name: 'Home',
  data() {
    return {
      puzzles: puzzles.length,
      list
    }
  },
  methods: {
    loadPuzzle(pn) {
      if(pn) this.$router.push('/puzzle/' + pn)
    }
  }
}
</script>

<style scoped>
.puzzles {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 1 100%;
}

.row {
  display: flex;
  cursor: pointer;
}

.col {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
  font-size: 23px;
}

.row:nth-child(even) .col:nth-child(odd):not(.blank),
.row:nth-child(odd) .col:nth-child(even):not(.blank) {
  background: #eee
}


</style>