import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createBooking } from "../../redux/bookings/operations.js";

export const BookingForm = ({ business, isOpen, onCloseModal }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    date: Yup.date()
      .min(new Date(), "Date must be in the future")
      .required("Date is required"),
    time: Yup.string().required("Time is required"),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const startAt = new Date(`${values.date}T${values.time}`);
        const endAt = new Date(startAt.getTime() + 60 * 60 * 1000);

        dispatch(
          createBooking({
            businessId: business._id,
            startAt,
            endAt,
            notes: values.notes,
          })
        );

        resetForm();
        onCloseModal();
      } catch (err) {
        console.error(err);
        alert("Failed to book appointment");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onCloseModal}>
      <DialogTitle>Book Appointment with {business.name}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            id="date"
            name="date"
            label="Select Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          <TextField
            margin="normal"
            fullWidth
            id="time"
            name="time"
            label="Select Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
          />

          <TextField
            margin="normal"
            fullWidth
            id="notes"
            name="notes"
            label="Notes"
            multiline
            rows={2}
            value={formik.values.notes}
            onChange={formik.handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            Book
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
