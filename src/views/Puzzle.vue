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
    let puzzle = fromPuzzleNumber(id)
    if(!puzzle && isValidPuzzleString(id)) { 
      puzzle = fromPuzzleString(id)
      id = '(generated)'
    }

    if(!puzzle) {
      puzzle = randomPuzzle()
      id = puzzle.id + ' (random)'
    }

    return {
      id,
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