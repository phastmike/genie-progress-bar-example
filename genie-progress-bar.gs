/* -*- Mode: Genie; indent-tabs-mode: nil; c-basic-offset: 4; tab-width: 4 -*- */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab : */ 
/* 
 * genie-progress-bar.gs 
 *
 * Genie progress bar example - activity mode
 */

uses Gtk

init
	Gtk.init (ref args)
	var AppWindow = new MainAppWindow ()
	AppWindow.show_all ()
	Gtk.main ()

class MainAppWindow : Window
	progress_bar:Gtk.ProgressBar

	init
		title = "Genie Progress Bar example"
		default_height = 40
		default_width = 350
		window_position = WindowPosition.CENTER

		var grid = new Gtk.Grid ()
		progress_bar = new Gtk.ProgressBar ()
		progress_bar.expand = true
		grid.attach (new Gtk.Label ("Genie, ProgressBar Example"), 0, 0, 1, 1) 
		grid.attach (progress_bar, 0, 1, 1, 1)

		add (grid)
		destroy.connect (Gtk.main_quit)
		Timeout.add (50, lambda_pb_pulse);

		var parser = new Parser ()
		parser.parse_ended.connect (lambda_on_parse_ended)
		parser.parse ()

	def lambda_pb_pulse () : bool
		progress_bar.pulse ()
		return true

	def lambda_on_parse_ended ()
		Gtk.main_quit ()

class Parser : Object
	counter:int
	event parse_ended ()

	def parse ()
		counter = 0
		print ("Start parsing..")
		Timeout.add_seconds (1, lambda_counter)

	def lambda_counter () : bool
		counter += 1
		print ("Counter %d", counter)
		if counter < 10
			return true
		else
			print ("Ended parsing..")
			parse_ended ()
			return false
