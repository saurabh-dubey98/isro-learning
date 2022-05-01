import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { astronomy, cosmology, universe } from "../../data/mcqData"

const initialState = {
    mcqQuestions: [],
    currentQuestion: 0,
    // questionBeforeSubmit: 0,
    answers: [],
    score: 0,
    time: 10,
    isLoading: false,
    subject: null
}

export const getMcq = createAsyncThunk(
    "mcq/getMcq",
    async (mcqSubject, thunkAPI) => {
        try {

            switch (mcqSubject) {
                case 'astronomy':
                    return astronomy
                case 'universe':
                    return universe
                case 'cosmology':
                    return cosmology
                default:
                    return;
            }
        } catch {
            return thunkAPI.rejectWithValue("Some error occured!")
        }
    }
)

const mcqSlice = createSlice({
    name: "mcq",
    initialState,
    reducers: {
        nextQuestion: (state, action) => {
            // Meaning of the below used values
            // "0" means wrong answer
            // "1" means right answer
            // "-" means did not attempt the question
            if (action.payload.didNotAttempt === true && state.answers.length <= state.mcqQuestions.length) {
                state.answers.push("-")
            }
            if (action.payload.isCorrect === true && state.answers.length <= state.mcqQuestions.length) {
                state.answers.push(1)
            }
            if (action.payload.isCorrect === false && state.answers.length <= state.mcqQuestions.length) {
                state.answers.push(0)
            }

            const nextQuestion = state.currentQuestion + 1
            if (nextQuestion < state.mcqQuestions.length) {
                state.currentQuestion = nextQuestion
            }
        },

        setSubject: (state, action) => {
            state.subject = action.payload
        },

        calculateScore: (state) => {
            state.answers.forEach(element => {
                if (element === 1) {
                    state.score += 1
                }
            });
        },

        reset: (state) => {
            state.mcqQuestions = []
            state.currentQuestion = 0
            state.answers = []
            state.score = 0
            state.time = 10
        }
    },
    extraReducers: {
        [getMcq.pending]: (state, action) => {
            state.isLoading = true
        },
        [getMcq.fulfilled]: (state, action) => {
            state.isLoading = false
            state.mcqQuestions = action.payload
        },
    },
})


export const { nextQuestion, reset, calculateScore, setSubject } = mcqSlice.actions

export default mcqSlice.reducer