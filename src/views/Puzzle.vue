<template>
  <div class="puzzle">
    <h1>puzzle {{ id }}</h1>
    <Grid :puzzle="puzzle"/>
  </div>
</template>

<script>
import { randomPuzzle, fromPuzzleNumber, isValidPuzzleString, fromPuzzleString } from '@/sudoku'
import Grid from '@/components/Grid'
export default {
  name: 'Puzzle',
  data() {

    let id = this.$route.params.id
    let puzzle = randomPuzzle()
    if(!isNaN(+id) && +id > 0) {
      // try and get the board
      puzzle = fromPuzzleNumber(+id)
    } else if(isValidPuzzleString(id)) {
      // make the board from the id string
      puzzle = fromPuzzleString(id, 'X')
    }

    return {
      id: puzzle.id,
      puzzle
    }
  },
  components: {
    Grid
  }
}
</script>

<style scoped>
.grid {
  justify-content: center;
}
</style>